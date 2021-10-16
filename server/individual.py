class Individual:
    def __init__(self, name, gender, hair_color):
        self.name = name
        self.gender = gender
        self.hair_color = hair_color


    def hair_color_matches(self, hair_color):
        return self.hair_color == hair_color

    def gender_matches(self, gender):
        return self.gender == gender

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        if other is None:
            return False
        else:
            return self.name == other.name
