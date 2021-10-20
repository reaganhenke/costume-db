class CostumeGroup:
    def __init__(self, name, group_size, description, image_url, origin, fandom_url):
        self.name = name
        self.members = []
        self.group_size = group_size
        self.description = description
        self.image_url = image_url
        self.origin = origin
        self.fandom_url = fandom_url

    def add_member(self, individual):
        self.members.append(individual)

    def __dict__(self):
        return {
            'name': self.name,
            'origin': self.origin,
            'imageUrl': self.image_url,
            'fandomLink': self.fandom_url,
            'description': self.description
        }

    def __str__(self):
        string = f"({self.name}: "
        for member in self.members:
            string += str(member)
            string += ', '

        return string[:-2] + ')'

    def __repr__(self):
        return self.__str__()
        